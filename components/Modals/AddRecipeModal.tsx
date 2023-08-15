'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Modal from './Modal';
import Heading from '../Common/Heading';
import Input from '../Common/Input';
import useAddRecipeModal from '@/hooks/useAddRecipeModal';

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

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.BASICS);

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
    },
  });

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

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.BASICS) {
      return undefined;
    }

    return 'Prev';
  }, [step]);

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
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      ></div>
    </div>
  );

  if (step === STEPS.INGREDIENT_AND_QUANTITIES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Building Blocks of Flavor"
          subtitle="List the ingredients needed, along with precise quantities."
        />
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
      title="Share your fun recipe ✨"
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
