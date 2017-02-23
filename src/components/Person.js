import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Person = ({ person }) => {
  if (person === undefined) {
    return (
      <div className="person">
        Hyperdrive activate...
      </div>
    );
  }
  return (
    <div className="person">
      <h3>{person.name}</h3>
      <p>Birth year: {person.birth_year}</p>
      <p>Gender: {person.gender}</p>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
      <p>Eye color: {person.eye_color}</p>
      <p>Hair color: {person.hair_color}</p>
      <p>Skin color: {person.skin_color}</p>
      <p>
        <Link to="/movie">{'<== Back to movie list'}</Link>
      </p>
    </div>
  );
};

Person.propTypes = {
  person: PropTypes.object.isRequired,
};

export default Person;
