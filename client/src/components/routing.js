import SumOf2 from "../problemsFolder/SumOf2";
import PowOfANum from "../problemsFolder/PowerOfANumber";
import AreaOfRect from "../problemsFolder/AreaOfRect";
import LCMOf2 from "../problemsFolder/LCMof2";
import GreatestOf2 from "../problemsFolder/GreatestOf2";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./homepage";

function Routing() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="SumOf2" element={<SumOf2 />} />
          <Route path="PowerOfANumber" element={<PowOfANum />} />
          <Route path="AreaOfRect" element={<AreaOfRect />} />
          <Route path="LCMOf2" element={<LCMOf2 />} />
          <Route path="GreatestOf2" element={<GreatestOf2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
