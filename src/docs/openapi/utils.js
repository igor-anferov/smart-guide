module.exports = {
  make_path_params: (properties) =>
    Object.fromEntries(
      Object.entries(properties)
        .map(([k, v]) => [k, {
          name: k,
          description: v.description,
          in: 'path',
          schema: v,
          required: true,
        }])
    ),
  filter: (object, needed_props) =>
    Object.fromEntries(
      Object.entries(object)
        .filter(([k, v]) => needed_props.includes(k))
    ),
}
