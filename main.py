import hashlib

# Given string
s = '811aa979'

# Create a new sha512 hash object
hash_object = hashlib.sha512()

# Update the hash object with the bytes of the given string
hash_object.update(s.encode())

# Get the hexadecimal representation of the hash
hex_dig = hash_object.hexdigest()

print(hex_dig)
