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
  const [showAllPosts, setShowAllPosts] = useState(false);

  const onInputChange = (event:FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValue(value);
    setShowAllPosts(false);
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

  const onOptionClick = (option:IPost) => {
    setInputValue(option.title);
    setSelectedOption(option);
    setShowOptions(false);
  };

  const onSelectClick = () => {
    setShowAllPosts(!showAllPosts);
    setFilteredOptions([]);
    setInputValue('');
  };

  return (
      <div className="typeahead-select-box">
        <div className="input-field">
          <input
              type="text"
              value={inputValue}
              onChange={onInputChange}
              placeholder="select a post or search here.."
          />
          <i className={`select-aff${filteredOptions.length > 1 ? ' suggestions' : (showAllPosts ? ' open' : ' closed')}`} onClick={onSelectClick}></i>
        </div>
        {showOptions && (
            <ul className="options-list">
              {filteredOptions.map((option, index) => (
                  <li key={index} onClick={() => onOptionClick(option)}>
                  <Link to={`/posts/${option.id}`}>{option.title}</Link>
                  </li>
              ))}
            </ul>
        )}
        {showAllPosts && (
            <ul className="options-list">
              {options.map((option, index) => (
                  <li key={index} onClick={() => onOptionClick(option)}>
                    <Link to={`/posts/${option.id}`}>{option.title}</Link>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default TypeaheadSelectBox;