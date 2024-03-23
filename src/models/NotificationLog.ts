type NotificationLog = {
 _id: string;
 createdAt: string;
 payload: string;
 phone: string;
 status: "SENT" | "FAILED";
 template: string;
};

export default NotificationLog;
