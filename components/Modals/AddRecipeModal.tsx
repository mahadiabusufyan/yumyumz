'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
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
import { useFormik } from 'formik';
import AddRecipeFormSchema from '@/yupSchemas/AddRecipeForm';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { generateId } from '@/lib/utils';
import { getAuth } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

enum STEPS {
  BASICS = 0,
  INGREDIENT_AND_QUANTITIES = 1,
  INSTRUCTIONS = 2,
  PHOTOS = 3,
  SOURCE = 4,
}

interface Recipe {
  title: string;
  cuisine: string;
  photos?: [];
  cookingTime: number;
  ingredients?: [];
}

const INITIAL_RECIPE_DATA: Recipe = {
  title: '',
  cuisine: '',
  photos: [],
  cookingTime: 5,
  ingredients: [],
};

const AddRecipeModal = () => {
  const router = useRouter();
  const addRecipeModal = useAddRecipeModal();
  const initialValues = INITIAL_RECIPE_DATA;
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: number }[]
  >([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState(STEPS.BASICS);
  const [instructions, setInstructions] = useState('');
  const auth = getAuth();

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
    validationSchema: AddRecipeFormSchema,
    onSubmit: async (values, action) => {
      if (step !== STEPS.PHOTOS) {
        return onNext();
      }
      setLoading(true);
      if (!values?.photos || values?.photos?.length < 3) {
        setLoading(false);
        // toast.error('Select at least 3 photos');
        return;
      }
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
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  // console.log('Upload is paused');
                  break;
                case 'running':
                  // console.log('Upload is running');
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
        isVerified: false,
        ingredients: ingredients,
        instructions: instructions,
        ownerRef: auth.currentUser?.uid,
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

  const handleAddIngredient = (ingredient: {
    name: string;
    quantity: number;
  }) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string | number | { name: string; quantity: number }[]
  ) => {
    console.log('Ingredient Change:', index, field, value);

    const updatedIngredients = [...ingredients];

    if (field === 'ingredients') {
      console.log('Setting ingredients directly:', value);
      setIngredients(value as { name: string; quantity: number }[]);
    } else {
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value,
      };

      console.log('Updated ingredients array:', updatedIngredients);
      setIngredients(updatedIngredients);
    }
  };

  console.log(ingredients);

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

  console.log(instructions);

  let bodyContent = (
    <div className="flex flex-col gap-6">
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
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3
          max-h-[30vh]
          md:max-h-[30vh]
          overflow-y-auto
        "
      >
        {cuisines.map((cuisineOption) => (
          <CuisineBox
            key={cuisineOption.label}
            label={cuisineOption.label}
            selected={values.cuisine === cuisineOption.label}
            onClick={(cuisine) => setFieldValue('cuisine', cuisine)}
          />
        ))}
      </div>
      <CookingTime
        value={values.cookingTime}
        onChange={(cookingTime) => setFieldValue('cookingTime', cookingTime)}
      />
    </div>
  );

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
          <h2 className="text-lg font-semibold mb-2">Cooking Instructions</h2>
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
