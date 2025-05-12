
export const checkResponse = ({ res }: any) => {
  if (res?.data?.status_code === 200) {
    return {
      success: true,
      message: res?.data?.message || "Operation successful"
    };
  } else {
    return {
      success: false,
      message: res?.data?.data || "An error occurred"
    };
  }
};

