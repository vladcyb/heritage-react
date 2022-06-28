import { Person } from '@models/Person'

type OneOfFioType = 'surname' | 'name' | 'patronymic' | 'dateOfBirth'


export const personsSortFactory = (
  a: Person,
  b: Person,
  key1: OneOfFioType,
  key2: OneOfFioType,
  key3: OneOfFioType,
  key4: OneOfFioType,
) => {
  return ((a, b) =>
    !a[key1] ? 1 :
      !b[key1] ? -1 :
        a[key1] < b[key1] ? -1 :
          a[key1] > b[key1] ? 1 :
            !a[key2] ? 1 :
              !b[key2] ? -1 :
                a[key2] < b[key2] ? -1 :
                  a[key2] > b[key2] ? 1 :
                    !a[key3] ? 1 :
                      !b[key3] ? -1:
                        a[key3] < b[key3] ? -1 :
                          a[key3] > b[key3] ? 1 :
                            !a[key4] ? 1 :
                              !b[key4] ? -1:
                                a[key4] < b[key4] ? -1 :
                                  a[key4] > b[key4] ? 1 :
                                    0) (a, b)
}
