export const checkResponse = ({ res }: any) => {
  console.log(res, "Res");
  if (res?.data?.status_code === 200) {
    return true;
  } else {
    return false;
  }
};
