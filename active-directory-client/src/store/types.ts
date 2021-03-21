import { RequestInfoDto } from "../api/activeDirectory";

export type ApplicationState = {
    error?: string,
    requestInfo?: RequestInfoDto
}