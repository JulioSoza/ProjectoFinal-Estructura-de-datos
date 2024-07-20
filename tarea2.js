function generateRandomArray(size, max) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max));
}

function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}

function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [], leftIdx = 0, rightIdx = 0;

    while (leftIdx < left.length && rightIdx < right.length) {
        if (left[leftIdx] < right[rightIdx]) {
            result.push(left[leftIdx]);
            leftIdx++;
        } else {
            result.push(right[rightIdx]);
            rightIdx++;
        }
    }
    return result.concat(left.slice(leftIdx)).concat(right.slice(rightIdx));
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [], right = [];
    for (const el of arr.slice(0, arr.length - 1)) {
        el < pivot ? left.push(el) : right.push(el);
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

function startSorting() {
    const array = generateRandomArray(10000, 10000);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    const algorithms = [
        { name: 'Bubble Sort', method: bubbleSort },
        { name: 'Selection Sort', method: selectionSort },
        { name: 'Insertion Sort', method: insertionSort },
        { name: 'Merge Sort', method: mergeSort },
        { name: 'Quick Sort', method: quickSort }
    ];

    const times = algorithms.map(algo => {
        const arrCopy = [...array];
        const startTime = performance.now();
        algo.method(arrCopy);
        const endTime = performance.now();
        const timeTaken = endTime - startTime;
        return { name: algo.name, time: timeTaken.toFixed(2) };
    });

    times.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.textContent = `${result.name}: ${result.time} ms`;
        resultsDiv.appendChild(resultElement);
    });

    const fastestAlgorithm = times.sort((a, b) => a.time - b.time)[0].name;
    const verdictElement = document.createElement('div');
    verdictElement.innerHTML = `<strong>El método más rápido es: ${fastestAlgorithm}</strong>`;
    resultsDiv.appendChild(verdictElement);
}
