import { BusinessService } from "./business";
import { MisclService } from "./miscl";
import { UserService } from "./user";
import { UtilsService } from "./utils";
import { WorkspaceService } from "./workspace";

export const utilsService = new UtilsService();
export const businessService = new BusinessService();
export const userService = new UserService();
export const misclService = new MisclService();
export const workspaceService = new WorkspaceService();
