import { Option } from '../types';
import { imageKey } from '../images';
import './Option.css';

export function OptionComponent({ title, destination, is_final, img}: Option) {

    const resolvedImage = img && imageKey[img as keyof typeof imageKey] || undefined;
  return (
    <div className="option">
        {resolvedImage && <img src={resolvedImage} />}
        <h2 className="optionTitle">{title}</h2>
    </div>
  );
}
