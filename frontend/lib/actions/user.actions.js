
export const sendSMSNotification = async (phone, message) => {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_FASTAPI_API_URL}`

        const response = await axios.post(`${apiUrl}/sms/`, { phone, message });
        console.log('SMS sent:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error sending SMS:', error);
        return null;
    }
}
