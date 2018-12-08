export default {
  validateTelegramID: function (value) {
    value = parseInt(value)
    if (isNaN(value)) {
      return false
    }

    value = value.toString()
    if (value.length === 0 || value.length > 10) {
      return false
    }

    for (let i = 0; i < value.length; i++) {
      if (value[i] < '0' || value[i] > '9') {
        return false
      }
    }
    return true
  }
}
