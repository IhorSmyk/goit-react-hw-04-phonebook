import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ handleChangeFilter, value }) => {
  return (
    <>
      <label htmlFor="findByName">Find contacts by name</label>
      <input
        id="findByName"
        className={s.filter}
        type="text"
        name="name"
        placeholder="Search contact"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={handleChangeFilter}
        value={value}
      />
    </>
  );
};

Filter.propTypes = {
  handleChangeFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Filter;
