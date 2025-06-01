import { Outlet, Link } from "react-router-dom";

const HomePage = () => {
  let easy_qstns = {
    "/SumOf2": "Add 2 numbers",
    "/PowerOfANumber": "Power of a number",
    "/GreatestOf2": "Greatest of 2 numbers",
    "/LCMOf2": "LCM of 2 numbers",
    "/AreaOfRect": "Area of rectangle",
  };
  let medium_qstns = { "/SumOf2": "Add 2 numbers", "/MulOf2": "Mul 2 numbers" };
  let hard_qstns = { "/SumOf2": "Add 2 numbers", "/MulOf2": "Mul 2 numbers" };

  return (
    <>
      <h1> Choose questions based on levels</h1>
      <nav>
        <details>
          <summary>Easy</summary>
          <ol>
            {Object.keys(easy_qstns).map((key, index) => (
              <li key={index}>
                <Link to={key}> {easy_qstns[key]}</Link>
              </li>
            ))}
          </ol>
        </details>
        <details>
          <summary>Medium</summary>
          <ol>
            {Object.keys(medium_qstns).map((key, index) => (
              <li key={index}>
                <Link to={key}> {medium_qstns[key]}</Link>
              </li>
            ))}
          </ol>
        </details>
        <details>
          <summary>Hard</summary>
          <ol>
            {Object.keys(hard_qstns).map((key, index) => (
              <li key={index}>
                <Link to={key}> {hard_qstns[key]}</Link>
              </li>
            ))}
          </ol>
        </details>
      </nav>

      <Outlet />
    </>
  );
};

export default HomePage;
