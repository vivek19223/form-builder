import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui clearing segment">
      <div className="ui left floated header">
        <Link to="/">Forms</Link>
      </div>
      <div className="ui right floated header">
        <Link className="ui button primary" to="/create">Create Form </Link>
      </div>
    </div>
  );
};

export default Header;
