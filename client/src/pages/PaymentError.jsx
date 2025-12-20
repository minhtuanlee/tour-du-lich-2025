import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCcw, Home, ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function PaymentError() {
    const navigate = useNavigate();

    useEffect(() => {
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 15,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl w-full"
                >
                    {/* Error Icon */}
                    <motion.div variants={iconVariants} className="flex justify-center mb-8">
                        <div className="relative">
                            {/* Animated circles */}
                            <motion.div
                                className="absolute inset-0 bg-red-100 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.2, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                            <motion.div
                                className="absolute inset-0 bg-red-200 rounded-full"
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.3, 0.1, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 0.5,
                                }}
                            />
                            {/* Main icon */}
                            <div className="relative w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-2xl">
                                <XCircle className="w-20 h-20 text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Error Message Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-red-100"
                    >
                        {/* Title */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                        >
                            Thanh toán không thành công
                        </motion.h1>

                        {/* Description */}
                        <motion.p variants={itemVariants} className="text-gray-600 text-lg mb-8 leading-relaxed">
                            Rất tiếc, giao dịch của bạn không thể hoàn tất. Vui lòng kiểm tra lại thông tin thanh toán
                            hoặc thử lại sau.
                        </motion.p>

                        {/* Reasons */}
                        <motion.div
                            variants={itemVariants}
                            className="mb-8 p-6 bg-red-50 rounded-2xl border border-red-200"
                        >
                            <h3 className="font-semibold text-gray-800 mb-3 text-left">💡 Nguyên nhân có thể:</h3>
                            <ul className="text-left text-gray-600 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">•</span>
                                    <span>Thông tin thẻ không chính xác hoặc đã hết hạn</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">•</span>
                                    <span>Số dư tài khoản không đủ</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">•</span>
                                    <span>Kết nối mạng bị gián đoạn</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">•</span>
                                    <span>Ngân hàng từ chối giao dịch</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="large"
                                icon={<ArrowLeft className="w-5 h-5" />}
                                onClick={() => navigate(-1)}
                                className="flex items-center justify-center gap-2 px-8 py-6 h-auto text-base rounded-xl hover:!border-gray-400 hover:!text-gray-700 transition-all"
                            >
                                Quay lại
                            </Button>

                            <Button
                                type="primary"
                                size="large"
                                icon={<RefreshCcw className="w-5 h-5" />}
                                onClick={() => navigate('/cart')}
                                className="flex items-center justify-center gap-2 px-8 py-6 h-auto text-base rounded-xl bg-gradient-to-r from-[#FF3B2F] to-[#FF6F4A] hover:from-[#E62E24] hover:to-[#FF5A3D] border-0 shadow-lg hover:shadow-xl transition-all"
                            >
                                Thử lại
                            </Button>

                            <Button
                                size="large"
                                icon={<Home className="w-5 h-5" />}
                                onClick={() => navigate('/')}
                                className="flex items-center justify-center gap-2 px-8 py-6 h-auto text-base rounded-xl hover:!border-blue-400 hover:!text-blue-600 transition-all"
                            >
                                Về trang chủ
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Support Information */}
                    <motion.div variants={itemVariants} className="mt-8 text-center">
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
                            <p className="text-gray-600 mb-2">
                                <span className="font-semibold">Cần hỗ trợ?</span> Liên hệ với chúng tôi
                            </p>
                            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-2">
                                    📞{' '}
                                    <a href="tel:1900xxxx" className="hover:text-[#FF3B2F]">
                                        1900 xxxx
                                    </a>
                                </span>
                                <span className="text-gray-300">|</span>
                                <span className="flex items-center gap-2">
                                    📧{' '}
                                    <a href="mailto:support@example.com" className="hover:text-[#FF3B2F]">
                                        support@example.com
                                    </a>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}

export default PaymentError;
