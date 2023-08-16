'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
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

enum STEPS {
  BASICS = 0,
  INGREDIENT_AND_QUANTITIES = 1,
  INSTRUCTIONS = 2,
  PHOTOS = 3,
  SOURCE = 4,
}

const AddRecipeModal = () => {
  const router = useRouter();
  const addRecipeModal = useAddRecipeModal();
  const [ingredients, setIngredients] = useState<
    { name: string; quantity: number }[]
  >([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.BASICS);
  const [instructions, setInstructions] = useState('');

  const handleInstructionsChange = (newInstructions: string) => {
    setInstructions(newInstructions);
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      cookingTime: 5,
      ingredients: [],
    },
  });
  const cuisine = watch('cuisine');
  const cookingTime = watch('cookingTime');
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.SOURCE) {
      return onNext();
    }
    // setIsLoading(true);
    // router.refresh();
    // reset();
    // setStep(STEPS.BASICS);
    addRecipeModal.onClose();
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.SOURCE) {
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

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.BASICS) {
      return undefined;
    }

    return 'Prev';
  }, [step]);

  function handleImagesChange(newImages: File[]) {
    // setFieldValue('photos', newImages);
    setPhotos(newImages);
  }

  console.log(instructions);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Introduce Your Culinary Creation"
        subtitle="Fill in the essential details to give your recipe its identity."
      />
      <Input
        id="title"
        label="Recipe Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3
          max-h-[30vh]
          md:max-h-[30vh]
          overflow-y-auto
        "
      >
        {cuisines.map((item) => (
          <div key={item.label} className="col-span-1">
            <CuisineBox
              onClick={(cuisine) => setCustomValue('cuisine', cuisine)}
              selected={cuisine === item.label}
              label={item.label}
            />
          </div>
        ))}
      </div>
      <CookingTime
        value={cookingTime}
        onChange={(value) => setCustomValue('cookingTime', value)}
      />
    </div>
  );

  if (step === STEPS.INGREDIENT_AND_QUANTITIES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
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
            onIngredientChange={handleIngredientChange} // Pass the handler to IngredientForm
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.INSTRUCTIONS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
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
      <div className="flex flex-col gap-8">
        <Heading
          title="Picture-Perfect: Showcasing Your Dish"
          subtitle="Share photos, dietary preferences, and allergens if applicable."
        />
        <PhotosUploader
          images={photos}
          // error={errors.photos && touched.photos}
          // errorText={errors.photos}
          onImagesChange={handleImagesChange}
        />
      </div>
    );
  }

  if (step === STEPS.SOURCE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="The Roots of Your Recipe"
          subtitle="Give credit and share your recipe's origin before submitting."
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={addRecipeModal.isOpen}
      title="Post your recipe ✨"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.BASICS ? undefined : onBack}
      onClose={addRecipeModal.onClose}
      body={bodyContent}
    />
  );
};

export default AddRecipeModal;
