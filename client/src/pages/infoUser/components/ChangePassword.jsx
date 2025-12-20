import { useState } from 'react';
import { Form, Input, Button, Card, Alert, Space } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeOutlined, CheckCircleOutlined, KeyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { requestChangePassword } from '../../../config/UserRequest';

function ChangePassword() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        setShowSuccess(false);

        try {
            const res = await requestChangePassword({
                oldPassword: values.currentPassword,
                newPassword: values.newPassword,
            });

            if (res) {
                setShowSuccess(true);
                toast.success('Đổi mật khẩu thành công!');
                form.resetFields();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Đổi mật khẩu thất bại!');
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = (_, value) => {
        if (!value) {
            return Promise.reject(new Error('Vui lòng nhập mật khẩu mới!'));
        }
        if (value.length < 6) {
            return Promise.reject(new Error('Mật khẩu phải có ít nhất 6 ký tự!'));
        }
        if (!/(?=.*[a-z])/.test(value)) {
            return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 chữ thường!'));
        }
        if (!/(?=.*[A-Z])/.test(value)) {
            return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 chữ hoa!'));
        }
        if (!/(?=.*\d)/.test(value)) {
            return Promise.reject(new Error('Mật khẩu phải có ít nhất 1 chữ số!'));
        }
        return Promise.resolve();
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-2xl mx-auto">
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-gradient-to-r from-[#FF3B2F] to-[#FF6F4A] rounded-2xl shadow-lg">
                        <LockOutlined className="text-2xl text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF3B2F] to-[#FF6F4A] bg-clip-text text-transparent">
                            Đổi Mật Khẩu
                        </h1>
                        <p className="text-gray-500 mt-1">Cập nhật mật khẩu để bảo mật tài khoản</p>
                    </div>
                </div>
            </motion.div>

            {/* Success Alert */}
            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6"
                >
                    <Alert
                        message="Thành công!"
                        description="Mật khẩu của bạn đã được cập nhật thành công."
                        type="success"
                        showIcon
                        icon={<CheckCircleOutlined />}
                        closable
                        onClose={() => setShowSuccess(false)}
                        className="border-green-200 bg-green-50"
                    />
                </motion.div>
            )}

            {/* Form Card */}
            <motion.div variants={itemVariants}>
                <Card className="shadow-xl rounded-2xl border-0 overflow-hidden">
                    {/* Card Header with gradient */}
                    <div className="bg-gradient-to-r from-[#FF3B2F]/10 to-[#FF6F4A]/10 border-b border-gray-200 px-8 py-6">
                        <div className="flex items-center gap-3">
                            <KeyOutlined className="text-2xl text-[#FF3B2F]" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">Thông tin mật khẩu</h3>
                                <p className="text-sm text-gray-500">Vui lòng nhập mật khẩu hiện tại và mật khẩu mới</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            autoComplete="off"
                            requiredMark={false}
                        >
                            {/* Current Password */}
                            <Form.Item
                                name="currentPassword"
                                label={<span className="text-base font-semibold text-gray-700">Mật khẩu hiện tại</span>}
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<LockOutlined className="text-gray-400" />}
                                    placeholder="Nhập mật khẩu hiện tại"
                                    iconRender={(visible) =>
                                        visible ? (
                                            <EyeOutlined className="text-gray-400" />
                                        ) : (
                                            <EyeInvisibleOutlined className="text-gray-400" />
                                        )
                                    }
                                    className="rounded-lg"
                                />
                            </Form.Item>

                            {/* Divider */}
                            <div className="my-8 border-t border-dashed border-gray-300"></div>

                            {/* New Password */}
                            <Form.Item
                                name="newPassword"
                                label={<span className="text-base font-semibold text-gray-700">Mật khẩu mới</span>}
                                rules={[{ validator: validatePassword }]}
                                hasFeedback
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<LockOutlined className="text-gray-400" />}
                                    placeholder="Nhập mật khẩu mới"
                                    iconRender={(visible) =>
                                        visible ? (
                                            <EyeOutlined className="text-gray-400" />
                                        ) : (
                                            <EyeInvisibleOutlined className="text-gray-400" />
                                        )
                                    }
                                    className="rounded-lg"
                                />
                            </Form.Item>

                            {/* Confirm Password */}
                            <Form.Item
                                name="confirmPassword"
                                label={
                                    <span className="text-base font-semibold text-gray-700">Xác nhận mật khẩu mới</span>
                                }
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                        },
                                    }),
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    size="large"
                                    prefix={<LockOutlined className="text-gray-400" />}
                                    placeholder="Nhập lại mật khẩu mới"
                                    iconRender={(visible) =>
                                        visible ? (
                                            <EyeOutlined className="text-gray-400" />
                                        ) : (
                                            <EyeInvisibleOutlined className="text-gray-400" />
                                        )
                                    }
                                    className="rounded-lg"
                                />
                            </Form.Item>

                            {/* Password Requirements */}
                            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                <p className="text-sm font-semibold text-blue-800 mb-2">Yêu cầu mật khẩu:</p>
                                <ul className="text-sm text-blue-700 space-y-1 ml-5">
                                    <li className="list-disc">Ít nhất 6 ký tự</li>
                                    <li className="list-disc">Chứa ít nhất 1 chữ thường (a-z)</li>
                                    <li className="list-disc">Chứa ít nhất 1 chữ hoa (A-Z)</li>
                                    <li className="list-disc">Chứa ít nhất 1 chữ số (0-9)</li>
                                </ul>
                            </div>

                            {/* Submit Button */}
                            <Form.Item className="mb-0">
                                <Space className="w-full flex justify-end gap-3">
                                    <Button
                                        size="large"
                                        onClick={() => form.resetFields()}
                                        className="px-8 rounded-lg hover:!border-gray-400 hover:!text-gray-700"
                                    >
                                        Đặt lại
                                    </Button>
                                    <Button
                                        type="primary"
                                        size="large"
                                        htmlType="submit"
                                        loading={loading}
                                        icon={<CheckCircleOutlined />}
                                        className="px-8 rounded-lg bg-gradient-to-r from-[#FF3B2F] to-[#FF6F4A] hover:from-[#E62E24] hover:to-[#FF5A3D] border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Đổi mật khẩu
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </motion.div>

            {/* Security Tips */}
            <motion.div variants={itemVariants} className="mt-6">
                <Card className="shadow-md rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <LockOutlined className="text-xl text-orange-600" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-semibold text-gray-800 mb-2">💡 Lời khuyên bảo mật</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Không chia sẻ mật khẩu với bất kỳ ai</li>
                                <li>• Sử dụng mật khẩu khác nhau cho các tài khoản khác nhau</li>
                                <li>• Đổi mật khẩu định kỳ (khuyến nghị 3-6 tháng/lần)</li>
                                <li>• Không sử dụng thông tin cá nhân dễ đoán trong mật khẩu</li>
                            </ul>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
}

export default ChangePassword;
