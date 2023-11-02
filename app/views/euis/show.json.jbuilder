# frozen_string_literal: true

json.eui do
  json.is_password_protected @setting.is_password_protected
  json.title @setting.title
end
