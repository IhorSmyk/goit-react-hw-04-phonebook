import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChangeData = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitData = e => {
    e.preventDefault();
    this.props.sendData(this.state.name, this.state.number);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <>
        <form className={s.form} action="submit" onSubmit={this.submitData}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter a name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChangeData}
            value={this.state.name}
          />

          <label htmlFor="number">Number</label>
          <input
            id="number"
            type="text"
            name="number"
            placeholder="Enter a number"
            pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
            title="This field may contain numbers"
            required
            onChange={this.handleChangeData}
            value={this.state.number}
          />
          <button type="submit">Add contact to the list</button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  sendData: PropTypes.func.isRequired,
};

export default ContactForm;
