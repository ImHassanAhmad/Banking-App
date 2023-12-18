import React, { useState } from 'react';
import Heading from '@app/components/Heading';
import OnboardingList from '@app/components/OnboardingList';
import { type Category } from 'types';
import { BUSINESS_CATEGORY } from '@app/constants/business-categories';

const BusinessCategory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const categories: Category[] = BUSINESS_CATEGORY;
  if (!selectedCategory) {
    // Render main categories if no category is selected
    return (
      <OnboardingList
        title="Business Categories"
        subtitle=""
        itemList={categories.map((cat) => ({
          topic: cat.topic,
          details: ''
        }))}
        onItemClick={(category: string) => {
          // Set the selected category in state
          setSelectedCategory(category);
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
        topic: subcategory.name
      }))}
      onItemClick={(selectedSubcategory: string) => {
        // Handle logic when a subcategory is selected
        console.log(`Selected subcategory: ${selectedSubcategory}`);
      }}
    />
  );
};

export default BusinessCategory;
