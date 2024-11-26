interface TestCase {
    id: number;
    text: string;
    checked: boolean;
}

export function Test(): TestCase[] {
    const array: TestCase[] = [];
    for (let i = 1; i <= 2500; i++) {
      array.push({
        id: i,
        text: `할일 ${i}`,
        checked: false,
      });
    }
    return array;
}