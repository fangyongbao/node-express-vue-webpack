module.exports = {
    apps: [
        // First application
        {
            name: 'ev',
            script: './server/bin/www',
            watch: true,
            out_file: './logs/ev.out.log',
            error_file: './logs/ev.error.log',
            // 日志输出时间格式
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
            // 异常重启时间间隔 每4s重启异常, 避免服务器频发重启
            restart_delay: 4000,
            // 服务占用的内存超过300M，会自动进行重启
            max_memory_restart: "300M",
            // 进程数，服务器是几个内核就启动几个服务。 设置0，自动根据服务器配置开启相应进程数
            // instances: 4,
            // exec_mode: "cluster"
        }
    ]
}
