import { type Source } from "https://deno.land/x/fall_core@v0.5.1/mod.ts";
import { assert, is } from "https://deno.land/x/unknownutil@v3.16.3/mod.ts";

const isSourceItem = is.ObjectOf({
  value: is.String,
  label: is.OptionalOf(is.String),
  detail: is.OptionalOf(is.RecordOf(is.Unknown, is.String)),
});

const isOptions = is.StrictOf(is.ObjectOf({
  items: is.ArrayOf(isSourceItem),
}));

export function getSource(
  options: Record<string, unknown>,
): Source {
  assert(options, isOptions);
  const items = options.items;
  return {
    getStream: (_denops, ..._args) => {
      return ReadableStream.from(items);
    },
  };
}
