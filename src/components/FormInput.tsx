import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { colors } from "../theme";

type Props<T extends FieldValues> = TextInputProps & {
  control: Control<T>;
  name: Path<T>;
  label: string;
};

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.wrapper}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            {...rest}
            style={[styles.input, error ? styles.inputError : null]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor={colors.muted}
          />
          {error ? <Text style={styles.error}>{error.message}</Text> : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
});
