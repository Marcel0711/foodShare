export type Category = 'breakfast' | 'lunch' | 'dinner' | 'fast food' | 'dessert'
export type Step = {
    title: string
    description: string
}
export type Author = {
    _id: string
    username: string
    avatar: string
}
export type Recipe = {
    _id: string
    title: string
    description: string
    ingredients: string[]
    steps: Step[]
    image: string
    author: string | Author
    category: Category
}
export type User = {
    _id: string
    username: string
    avatar: string
    token: string
}
export type UserActions = {
    type: 'LOGIN' | 'LOGOUT'
    payload?: User
}
export type UserState = {
    user: User | undefined
}