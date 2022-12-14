import { useRouteError } from "react-router-dom";
import '../css/app.css'
import { Link } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div class="container">
      <h1 className="ops">Oops!</h1>
      <p className="sorry">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">
      <button className="homebutt">Go Home</button>
      </Link>
    </div>
  );
}