import React from 'react';
import Button from './Button';
import { AiOutlinePlus } from 'react-icons/ai';

interface IngredientFormProps {
  ingredients: { name: string; quantity: number }[];
  onAddIngredient: (ingredient: { name: string; quantity: number }) => void;
  onIngredientChange: (
    index: number,
    field: string,
    value: string | number | { name: string; quantity: number }[]
  ) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({
  ingredients,
  onAddIngredient,
  onIngredientChange,
}) => {
  const handleAddIngredient = () => {
    onAddIngredient({ name: '', quantity: 1 });
  };

  const handleRemoveIngredient = (index: number) => {
    console.log('Removing ingredient at index:', index);
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    console.log('Updated ingredients after removal:', updatedIngredients);
    onIngredientChange(index, 'ingredients', updatedIngredients);
  };

  return (
    <div className="ingredient-form">
      <h2 className="text-lg font-semibold mb-2">Add Ingredients</h2>
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex items-center space-x-4 mb-2">
          <input
            type="text"
            placeholder="Ingredient Name"
            value={ingredient.name}
            onChange={(e) => onIngredientChange(index, 'name', e.target.value)}
            className="border rounded-md py-1 px-2 w-1/2"
          />
          <input
            type="number"
            min={1}
            value={ingredient.quantity}
            onChange={(e) =>
              onIngredientChange(index, 'quantity', parseInt(e.target.value))
            }
            className="border rounded-md py-1 px-2 w-1/4"
          />
          <button
            onClick={() => handleRemoveIngredient(index)}
            className="bg-red-500 text-white py-1 px-3 rounded-md"
          >
            Remove
          </button>
        </div>
      ))}
      <Button
        icon={AiOutlinePlus}
        small
        onClick={handleAddIngredient}
        label="Add Ingredient"
      />
    </div>
  );
};

export default IngredientForm;
