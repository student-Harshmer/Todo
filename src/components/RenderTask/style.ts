import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  taskContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#000',
    borderRadius: 12,
    flexDirection: 'row',
    width: '90%',
  },
  textContainer: {
    width: '75%',
    gap: 5,
  },
  taskTitleText: {
    fontSize: 17,
    fontWeight: 500,
  },
  descText: {
    color: '#fff',
  },
  idText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 500,
  },
  checkBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  removeButton: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
});