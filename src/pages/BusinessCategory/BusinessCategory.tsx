import Heading from '@app/components/Heading';
import OnboardingList from '@app/components/OnboardingList';
import { BUSINESS_CATEGORY } from '@app/constants/issuer-onboarding';
import { type Category, type WithSignUpStepperContextProps } from '@app/types/types';
import React, { useState } from 'react';

const BusinessCategory: React.FC<WithSignUpStepperContextProps> = ({
  updateActiveStep,
  updateUserPayload,
  userPayload
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(userPayload.businessCategory);

  const categories: Category[] = BUSINESS_CATEGORY;
  if (!selectedCategory) {
    // Render main categories if no category is selected
    return (
      <OnboardingList
        title="Business Categories"
        subtitle=""
        itemList={categories.map((cat) => ({
          topic: cat.topic,
          details: '',
          id: cat.id
        }))}
        onItemClick={(category: string) => {
          setSelectedCategory(category);
          updateUserPayload({ businessCategory: category });
        }}
      />
    );
  }

  // If a category is selected, find the corresponding subcategories
  const currentCategory = categories.find((c) => c.topic === selectedCategory);

  if (!currentCategory) {
    return (
      <div>
        <Heading title="Category Not Found" subTitle={`Category "${selectedCategory}" not found`} />
      </div>
    );
  }

  // Render subcategories if a category is selected
  return (
    <OnboardingList
      title={currentCategory.topic}
      subtitle=""
      itemList={currentCategory.subcategories.map((subcategory) => ({
        topic: subcategory.name,
        id: subcategory.name
      }))}
      onItemClick={(selectedSubcategory: string) => {
        updateUserPayload({ businessSubCategory: selectedSubcategory });
        updateActiveStep();
      }}
    />
  );
};

export default BusinessCategory;
