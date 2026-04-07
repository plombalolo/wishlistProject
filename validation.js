import { body } from 'express-validator'

export const loginValidator = [
    body('email', 'Не правильний формат пошти').isEmail(),
    body('password', 'Пароль має бути не менше 5 символів').isLength({ min: 5}),
]

export const registerValidator = [
    body('email', 'Не правильний формат пошти').isEmail(),
    body('password', 'Пароль має бути не менше 5 символів').isLength({ min: 5}),
    body('fullName', "Ім'я повинно бути не менше 3 символів").isLength({ min: 3}),
    body('avatarUrl', 'Не правильне посилання').optional().isURL(),
]

export const postCreateValidation = [
  body('title', 'Введіть заголовок статті').isLength({ min: 3 }).isString(),
  body('text', 'Введіть текст статті').isLength({ min: 10 }).isString(),
  body('tags', 'Невірний формат тегів (вкажіть масив)').optional().isString(),
  body('imageUrl', 'Невірне посилання на зображення').optional().isString(),
];