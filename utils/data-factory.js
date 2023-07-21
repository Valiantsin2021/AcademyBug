import { faker } from '@faker-js/faker'
export const user = {
  firstName: faker.person.firstName('male'),
  lastName: faker.person.lastName('male'),
  email: faker.internet.email(),
  countryCode: faker.number.int({
    min: 0,
    max: 30
  }),
  password: faker.internet.password(),
  phoneNumber: faker.number.int({ min: 1000000000, max: 9831063781 }),
  street: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  postalCode: faker.location.zipCode(),
  country: faker.location.country(),
  dateOfBirth: faker.date.birthdate().toISOString().slice(0, 10),
  gender: faker.person.sex()
}
export const product = ['Blue Hoodie', 'Professional Suit']
export const color = ['Orang', 'Green']
