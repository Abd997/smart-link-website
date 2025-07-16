import logger from "loglevel"

logger.setLevel(
  process.env.NEXT_PUBLIC_NODE_ENV === "production"
    ? logger.levels.ERROR
    : logger.levels.DEBUG
)

export default logger
