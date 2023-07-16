import dotenv from 'dotenv'
export default async function setup() {
  if (process.env.set) {
    dotenv.config({
      path: `./envs/.env.${process.env.set}`,
      override: true
    })
  }
}
