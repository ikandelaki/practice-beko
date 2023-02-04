import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [dropdownInfo, setDropdownInfo] = useState([]);
  const [chosenOption, setChosenOption] = useState("");
  const [validateNameInput, setValidateNameInput] = useState();

  useEffect(() => {
    axios
      .get("https://resume.redberryinternship.ge/api/degrees")
      .then((res) => setDropdownInfo(res.data));
  }, []);

  const checkName = (e) => {
    if (e.target.value.length < 2) {
      setValidateNameInput(false);
    } else {
      setValidateNameInput(true);
    }
    setValue(e.target.value);
  };

  const checkInputLength = () => {
    if (value.length === 0) return "";
    return validateNameInput ? "green" : "red";
  };

  return (
    <div className="App">
      <div className="cv-section">
        <div className={`${checkInputLength()}`}>
          <input
            placeholder="name"
            type="text"
            value={value}
            onChange={(e) => checkName(e)}
          />
        </div>
        <div>
          <input
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
          {dropdownInfo ? (
            <select
              value={chosenOption}
              onChange={(e) => setChosenOption(e.target.value)}
            >
              {dropdownInfo.map((el) => (
                <option key={el.id} value={`${el.title}`}>
                  {el.title}
                </option>
              ))}
            </select>
          ) : null}
        </div>
      </div>
      <div className="output-section">
        <div>{value}</div>
        <div>{dateValue}</div>
        <div>{chosenOption}</div>
      </div>
    </div>
  );
};

export default App;
