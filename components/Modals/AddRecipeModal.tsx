'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Modal from './Modal';
import Heading from '../Common/Heading';
import Input from '../Common/Input';
import useAddRecipeModal from '@/hooks/useAddRecipeModal';
import { cuisines } from '@/lib/cuisines';
import CuisineBox from '../Common/CuisineBox';
import CookingTime from '../Common/CookingTime';
import IngredientForm from '../Common/IngredientForm';
import RichTextEditor from '../Common/RichTextEditor';
import PhotosUploader from '../Common/PhotosUploader';
import slugify from 'slugify';
import { useFormik } from 'formik';
import AddRecipeFormSchema from '@/yupSchemas/AddRecipeForm';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { generateId, generateRandomString } from '@/lib/utils';
import { getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import DifficultySelector from '../Common/DifficultySelector';
import { User } from '@/app/(routes)/settings/page';
import useAuth from '@/hooks/useAuth';

enum STEPS {
  BASICS = 0,
  CATEGORY = 1,
  INGREDIENT_AND_QUANTITIES = 2,
  INSTRUCTIONS = 3,
  PHOTOS = 4,
  SOURCE = 5,
}

interface Recipe {
  title: string;
  cuisine: string;
  photos?: [];
  cookingTime: number;
  difficulty: string;
}

const INITIAL_RECIPE_DATA: Recipe = {
  title: '',
  cuisine: '',
  photos: [],
  cookingTime: 5,
  difficulty: '',
};

const AddRecipeModal = () => {
  const router = useRouter();
  const addRecipeModal = useAddRecipeModal();
  const initialValues = INITIAL_RECIPE_DATA;
  const [ingredients, setIngredients] = useState<{ name: string }[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState(STEPS.BASICS);
  const [instructions, setInstructions] = useState('');
  const auth = getAuth();
  const { user } = useAuth();
  const [userData, setUserData] = useState<User>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      const usersRef = collection(db, 'users');
      const queryRef = query(usersRef, where('email', '==', user?.email));
      const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setUserData(userData);
        }
      });

      return () => {
        unsubscribe(); // Cleanup the listener when the component unmounts
      };
    }
  }, [user]);

  const handleInstructionsChange = (newInstructions: string) => {
    setInstructions(newInstructions);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const {
    values,
    touched,
    errors,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: AddRecipeFormSchema,
    onSubmit: async (values, action) => {
      if (step !== STEPS.PHOTOS) {
        return onNext();
      }
      setLoading(true);
      if (!values?.photos || values?.photos?.length < 3) {
        setLoading(false);
        return;
      }

      console.log('submitted');
      async function storeImage(image: File) {
        return new Promise((resolve, reject) => {
          const storage = getStorage();
          const filename = `${auth.currentUser?.uid}-${
            image.name
          }-${generateId()}`;
          const storageRef = ref(storage, filename);
          const uploadTask = uploadBytesResumable(storageRef, image);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              switch (snapshot.state) {
                case 'paused':
                  break;
                case 'running':
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              reject(error);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      }

      const imgUrls = await Promise.all(
        values.photos?.map((image) => storeImage(image))
      ).catch((error) => {
        // toast.error('Images not uploaded');
        setLoading(false);
        return;
      });

      const recipeId = generateId();

      const formDataCopy = {
        ...values,
        imgUrls,
        timestamp: serverTimestamp(),
        ingredients: ingredients,
        verified: false,
        slug:
          slugify(values.title, { lower: true }) + '-' + generateRandomString(),
        instructions: instructions,
        ownerRef: userData.userId,
        recipeId,
      };

      delete formDataCopy.photos;
      const docRef = doc(db, 'recipes', recipeId);
      await setDoc(docRef, formDataCopy);
      // toast.success('Recipe created');
      // router.push(`/recipes/${recipeId}`);
      router.refresh();
      resetForm();
      setStep(STEPS.BASICS);
      addRecipeModal.onClose();
      setLoading(false);
    },
  });

  const actionLabel = useMemo(() => {
    if (step === STEPS.PHOTOS) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const handleAddIngredient = (ingredient: { name: string }) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string | number | { name: string }[]
  ) => {
    console.log('Ingredient Change:', index, field, value);

    const updatedIngredients = [...ingredients];

    if (field === 'ingredients') {
      console.log('Setting ingredients directly:', value);
      setIngredients(value as { name: string }[]);
    } else {
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value,
      };

      console.log('Updated ingredients array:', updatedIngredients);
      setIngredients(updatedIngredients);
      setFieldValue('ingredients', updatedIngredients);
    }
  };

  console.log(values);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.BASICS) {
      return undefined;
    }

    return 'Prev';
  }, [step]);

  function handleImagesChange(newImages: File[]) {
    setFieldValue('photos', newImages);
    setPhotos(newImages);
  }

  const handleDifficultyChange = (difficulty: string) => {
    setFieldValue('difficulty', difficulty); // Call the appropriate function to update the field value
  };

  console.log(values);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Introduce Your Culinary Creation"
        subtitle="Fill in the essential details to give your recipe its identity."
      />
      <Input
        id="title"
        name="title"
        label="Recipe Title"
        disabled={loading}
        value={values.title}
        error={errors.title && touched.title}
        errorText={errors.title}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      <CookingTime
        value={values.cookingTime}
        onChange={(cookingTime) => setFieldValue('cookingTime', cookingTime)}
      />
      <DifficultySelector
        selectedDifficulty={values.difficulty}
        onChange={handleDifficultyChange}
      />
    </div>
  );

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Building Blocks of Flavor"
          subtitle="List the ingredients needed, along with precise quantities."
        />
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3
          max-h-[55vh]
          md:max-h-[40vh]
          overflow-y-auto !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-secondary scrollbar-thumb-rounded-md pr-3 lg:pr-0
        "
        >
          {cuisines.map((cuisineOption) => (
            <CuisineBox
              key={cuisineOption.label}
              value={cuisineOption.value}
              label={cuisineOption.label}
              selected={values.cuisine === cuisineOption.value}
              onClick={(cuisine) => setFieldValue('cuisine', cuisine)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.INGREDIENT_AND_QUANTITIES) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Building Blocks of Flavor"
          subtitle="List the ingredients needed, along with precise quantities."
        />
        <div
          className=" max-h-[60vh]
          md:max-h-[30vh]
          overflow-y-auto"
        >
          <IngredientForm
            ingredients={ingredients}
            onAddIngredient={handleAddIngredient}
            onIngredientChange={handleIngredientChange}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.INSTRUCTIONS) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Cooking Chronicles: Step-by-Step"
          subtitle="Provide a detailed guide on how to prepare your dish."
        />
        <div className="min-h-[100px] mb-5">
          <h2 className="text-lg font-semibold mb-2">Cooking Process</h2>
          <RichTextEditor
            value={instructions}
            onChange={handleInstructionsChange}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.PHOTOS) {
    bodyContent = (
      <div className="flex flex-col gap-6">
        <Heading
          title="Picture-Perfect: Showcasing Your Dish"
          subtitle="Share photos, dietary preferences, and allergens if applicable."
        />
        <PhotosUploader
          images={photos}
          error={errors.photos && touched.photos}
          errorText={errors.photos}
          onImagesChange={handleImagesChange}
        />
      </div>
    );
  }

  // if (step === STEPS.SOURCE) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-6">
  //       <Heading
  //         title="The Roots of Your Recipe"
  //         subtitle="Give credit and share your recipe's origin before submitting."
  //       />
  //       <Input
  //         id="title"
  //         label="Recipe Title"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //     </div>
  //   );
  // }

  return (
    <Modal
      disabled={loading}
      isOpen={addRecipeModal.isOpen}
      loading={loading}
      title="Post your recipe ✨"
      actionLabel={actionLabel}
      onSubmit={handleSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.BASICS ? undefined : onBack}
      onClose={addRecipeModal.onClose}
      body={bodyContent}
    />
  );
};

export default AddRecipeModal;
