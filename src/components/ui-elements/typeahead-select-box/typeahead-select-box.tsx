import { FC, FormEvent, useState } from 'react';
import {IPost} from "../../../core/schemas";
import {Link} from "react-router-dom";

interface ITypeaheadSelectBox {
  options: IPost[];
}

const TypeaheadSelectBox:FC<ITypeaheadSelectBox> = ({ options }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<IPost[]>([]);
  const [, setSelectedOption] = useState<IPost | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (event:FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value);
    if (value.length > 0) {
      const filtered = options.filter(option =>
          option.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  };

  const handleOptionClick = (option:IPost) => {
    setInputValue(option.title);
    setSelectedOption(option);
    setShowOptions(false);
  };

  return (
      <div className="typeahead-select-box">
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="select a post or search here.."
        />
        {showOptions && (
            <ul className="options-list">
              {filteredOptions.map((option, index) => (
                  <li key={index} onClick={() => handleOptionClick(option)}>
                    <Link to={`/posts/${option.id}`}>{option.title}</Link>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default TypeaheadSelectBox;