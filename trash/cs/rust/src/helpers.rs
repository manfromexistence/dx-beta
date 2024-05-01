//! The contents of this module is all about helper functions

/// A function to print the type of a thing
///
/// Helpful at times
/// ```rust
/// extern crate cfonts;
///
/// use cfonts::helpers::print_type_of;
///
/// assert_eq!(print_type_of(&String::from("test")), "alloc::string::String");
/// assert_eq!(print_type_of(&5_i32), "i32");
/// assert_eq!(print_type_of(&(5_u8)), "u8");
/// assert_eq!(print_type_of(&[1_i32]), "[i32; 1]");
/// assert_eq!(print_type_of(&vec![""]), "alloc::vec::Vec<&str>");
/// ```
pub fn print_type_of<T>(_: &T) -> String {
	std::any::type_name::<T>().to_owned()
}

#[test]
fn print_type_of_works() {
	assert_eq!(print_type_of(&String::from("test")), "alloc::string::String");
	assert_eq!(print_type_of(&5_i32), "i32");
	assert_eq!(print_type_of(&(5_u8)), "u8");
	assert_eq!(print_type_of(&[1_i32]), "[i32; 1]");
	assert_eq!(print_type_of(&vec![""]), "alloc::vec::Vec<&str>");
}

/// Lowercase the first letter of a thing
///
/// ```rust
/// extern crate cfonts;
///
/// use cfonts::helpers::first_letter_to_lowercase;
///
/// assert_eq!(first_letter_to_lowercase("test"), "test");
/// assert_eq!(first_letter_to_lowercase("TEST"), "tEST");
/// assert_eq!(first_letter_to_lowercase("Test"), "test");
/// assert_eq!(first_letter_to_lowercase("!not a letter"), "!not a letter");
/// assert_eq!(first_letter_to_lowercase("1234"), "1234");
/// assert_eq!(first_letter_to_lowercase(""), "");
/// ```
pub fn first_letter_to_lowercase(s: &str) -> String {
	let mut c = s.chars();
	match c.next() {
		Some(f) => f.to_lowercase().collect::<String>() + c.as_str(),
		None => String::new(),
	}
}

#[test]
fn first_letter_to_lowercase_works() {
	assert_eq!(first_letter_to_lowercase("test"), "test");
	assert_eq!(first_letter_to_lowercase("TEST"), "tEST");
	assert_eq!(first_letter_to_lowercase("Test"), "test");
	assert_eq!(first_letter_to_lowercase("!not a letter"), "!not a letter");
	assert_eq!(first_letter_to_lowercase("1234"), "1234");
	assert_eq!(first_letter_to_lowercase(""), "");
}
