export const sortUpdatedDesc = (a, b) => {
  if (a.updatedAt > b.updatedAt) {
    return -1
  }
  if (a.updatedAt < b.updatedAt) {
    return 1
  }

  // names must be equal
  return 0
}

export const sortStartDesc = (a, b) => {
  if (a.startDate < b.startDate) {
    return -1
  }
  if (a.startDate > b.startDate) {
    return 1
  }

  // names must be equal
  return 0
}
