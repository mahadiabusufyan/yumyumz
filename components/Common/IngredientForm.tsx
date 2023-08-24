import React from 'react';
import Button from './Button';
import { BsTrash } from 'react-icons/bs';
import Tooltip from './Tooltip';
import { AiOutlinePlus } from 'react-icons/ai';

interface IngredientFormProps {
  ingredients: { name: string }[];
  onAddIngredient: (ingredient: { name: string }) => void;
  onIngredientChange: (
    index: number,
    field: string,
    value: string | { name: string }[]
  ) => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({
  ingredients,
  onAddIngredient,
  onIngredientChange,
}) => {
  const handleAddIngredient = () => {
    onAddIngredient({ name: '' });
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    onIngredientChange(index, 'ingredients', updatedIngredients);
  };

  return (
    <div className="ingredient-form">
      <h2 className="text-lg font-semibold mb-2">Add Ingredients</h2>
      <div className="grid gap-2 mb-3">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center gap-3 mb-2">
            <input
              type="text"
              placeholder="Ingredient Name"
              value={ingredient.name}
              onChange={(e) =>
                onIngredientChange(index, 'name', e.target.value)
              }
              className="border-2 hover:border-secondary py-2 px-2 w-full border-black focus:border-secondary  rounded-lg
              outline-none"
            />
            <div className="flex flex-col items-center justify-center">
              {' '}
              <button
                data-tooltip-id="remove-ingredient"
                onClick={() => handleRemoveIngredient(index)}
                className="bg-red-100 text-red-600 p-3 rounded-md"
              >
                <BsTrash size={20} />
              </button>
              <Tooltip id={'remove-ingredient'} content={'Remove'} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <Button
          icon={AiOutlinePlus}
          small
          onClick={handleAddIngredient}
          label="Add Ingredient"
        />
      </div>
    </div>
  );
};

export default IngredientForm;
