import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../services/apiUser";

export const useChangePassword = (options = {}) =>
  useMutation({
    mutationFn: ({ id, currentPassword, newPassword }) =>
      changePassword(id, currentPassword, newPassword),
    ...options,
  });
