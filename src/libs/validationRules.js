export default {
    required: [
        (val) => {
            if ((val ?? '').length > 0) return true;

            return 'This field cannot be empty.';
        },
    ],
    password: [
        (val) =>
            val.length >= 6 ? true : 'Password should be atleast 6 characters.',
    ],
    email: [
        (val) => {
            if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val)) return true;

            return 'Invalid email.';
        },
    ],
    postalCode: [
        (val) =>
            /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(val) ? true : 'Format: A2A2A2',
    ],
};
