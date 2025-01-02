type NotificationLog = {
 id: string;
 createdAt: string;
 payload: string;
 phone: string;
 status: "SUCCESS" | "FAILED";
 template: string;
};

export default NotificationLog;
