package is442.TicketingSystem.utils;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import java.io.Reader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.util.FileCopyUtils;
import org.springframework.core.io.Resource;
import org.springframework.boot.json.JsonParser;

public class utils {
    @Autowired
    private static ResourcePatternResolver resourceResolver;
    private static Random rand = new Random();
    private static Gson gson = new Gson();

    public static String getRandomImage() {
        try {
            String jsonFile = getRandomImageSet();
            return getRandomElement(readUrlsFromJsonFile(jsonFile));
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }


    private static List<String> readUrlsFromJsonFile(String fileName) throws IOException {
        try (Reader reader = new InputStreamReader(utils.class.getResourceAsStream("/unsplashImages/" + fileName))) {
            List<JsonObject> jsonArray = gson.fromJson(reader, new TypeToken<List<JsonObject>>() {}.getType());

            return jsonArray.stream()
                    .map(JsonElement::getAsJsonObject)
                    .filter(nestedObject -> nestedObject.has("urls"))
                    .map(nestedObject -> nestedObject.getAsJsonObject("urls"))
                    .filter(urlsObject -> urlsObject.has("regular"))
                    .map(urlsObject -> urlsObject.get("regular").getAsString())
                    .collect(Collectors.toList());
        }
    }


    private static String getRandomImageSet() throws IOException {
        try {
            List<String> jsonFileNames = Files.list(Paths.get(utils.class.getResource("/unsplashImages").toURI()))
                    .filter(Files::isRegularFile)
                    .filter(file -> file.toString().endsWith(".json"))
                    .map(Path::getFileName)
                    .map(Object::toString)
                    .collect(Collectors.toList());
            return getRandomElement(jsonFileNames);
        } catch (Exception e) {
            throw new IOException("Error while reading JSON filenames", e);
        }
    }

    public static <T> T getRandomElement(List<T> ls) {
        int randomIndex = rand.nextInt(ls.size());
        return ls.get(randomIndex);
    }


    public static String getRandomImageFAILED() {
        try {
            System.out.println("Getting all resources");
            Resource[] unsplashJsons = resourceResolver.getResources("classpath:unsplashImages/*.json");
            System.out.println("Got all resources");
            int idx = rand.nextInt(unsplashJsons.length);
            try (Reader reader = new InputStreamReader(unsplashJsons[idx].getInputStream())) {
                System.out.printf("Getting resource idx %d", idx);
                JsonParser springParser = JsonParserFactory.getJsonParser();
                Map<String, Object> jsonList = springParser.parseMap(FileCopyUtils.copyToString(reader));
                System.out.println(jsonList);
                idx = rand.nextInt(jsonList.size());
                Map<String, Object> json = (Map<String, Object>) jsonList.get(idx);
                Map<String, String> images = (Map<String, String>) json.get("urls");
                return images.get("regular");
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }
}
