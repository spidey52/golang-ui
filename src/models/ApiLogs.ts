import ApiUser from "./ApiUser";

type ApiLogs = {
 _id: string;
 id: string;
 baseUrl: string;
 url: string;
 duration: number;
 method: string;
 status: number;
 createdAt: string;
 user?: ApiUser;
};

export default ApiLogs;
