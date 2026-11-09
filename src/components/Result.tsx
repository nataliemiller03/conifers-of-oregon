// import { Option } from '../types';
// import { imageKey } from '../images';
// import './Option.css';

export function ResultComponent({ title, common, scientific, description, img}) {

  return (
    <div className="result">
        <h1 className="pageTitle libreBodoni">That's probably a {common}</h1>
        {scientific && <h2 className="subtitle libreBodoni italic">({scientific})</h2>}
        {description && <p>{description}</p>}
     </div>
   );
}
