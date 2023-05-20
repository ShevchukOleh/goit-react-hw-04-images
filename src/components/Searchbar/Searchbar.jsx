import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, ButtonLabel, Form, Input, Searchbar } from './Searchbar.styled';

const SearchBar = ({onSubmit}) => {
    const [value, setValue] = useState('')
    
    const handlerSubmit = e => {
        e.preventDefault();
        const word = e.target.elements[1].value.trim();
        if (word) onSubmit(word);
        setValue('')
    };
  
    const onChange = e => setValue(e.target.value);
  
    return (
        <Searchbar>
            <Form onSubmit={handlerSubmit}>
                <Button type="submit">
                    <ButtonLabel>Search</ButtonLabel>
                </Button>

                <Input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={onChange}
                    value={value}
                />
            </Form>
        </Searchbar>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default SearchBar;