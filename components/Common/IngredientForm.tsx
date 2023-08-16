import React from 'react';
import Button from './Button';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import Tooltip from './Tooltip';

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

  const handleQuantityChange = (index: number, newQuantity: number) => {
    onIngredientChange(index, 'quantity', newQuantity);
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
              className="border-2 hover:border-[#de79fb] py-2 px-2 w-full border-neutral-400 focus:border-[#de79fb]  rounded-lg
              outline-none"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleQuantityChange(
                    index,
                    Math.max(1, ingredient.quantity - 1)
                  )
                }
                className="bg-blue-100 text-blue-600 p-1 rounded-md"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={ingredient.quantity}
                onChange={(e) =>
                  onIngredientChange(
                    index,
                    'quantity',
                    parseInt(e.target.value)
                  )
                }
                className="border-2 hover:border-[#de79fb] py-2 px-2 border-neutral-400 focus:border-[#de79fb]  rounded-lg outline-none"
              />
              <button
                onClick={() =>
                  handleQuantityChange(index, ingredient.quantity + 1)
                }
                className="bg-green-100 text-green-600 p-1 rounded-md"
              >
                +
              </button>
            </div>
            {/* <input
              type="number"
              min={1}
              value={ingredient.quantity}
              onChange={(e) =>
                onIngredientChange(index, 'quantity', parseInt(e.target.value))
              }
              className="border-2 hover:border-[#de79fb] py-2 px-2 w-1/4 border-neutral-400 focus:border-[#de79fb]  rounded-lg
              outline-none"
            /> */}
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
        {' '}
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
