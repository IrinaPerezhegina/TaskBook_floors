interface FullNameProps {
  id?: number;
  firstName?: string;
  lastName?: string;
  middleName?: string | null;
}

export function getFullName(params: FullNameProps | undefined): string {
  let fullName: string = "Пользователь";
  if (!params) {
    return fullName;
  }

  if (params.lastName) {
    fullName = params.lastName;
  }
  if (params.firstName) {
    fullName = fullName + " " + params.firstName;
  }
  if (params.middleName) {
    fullName = fullName + " " + params.middleName;
  }

  return fullName;
}
