import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { formatVoteCount } from "../utils/formatter";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View>
    <Text className="light-300 color-gray-500 mb-2 mt-5 text-sm">{label}</Text>
    <Text className="text-medium">{value}</Text>
  </View>
);

const MovieGenres = ({ genres }: { genres: { name: string }[] }) => (
  <View>
    <Text className="light-300 color-gray-500 mb-2 mt-5 text-sm">Genres</Text>
    <View className="flex-row gap-x-2 flex-wrap  gap-2">
      {genres?.map((genre: { name: string }) => (
        <View key={genre.name} className="rounded-lg px-3 py-1 bg-gray-200">
          <Text className="text-medium">{genre.name}</Text>
        </View>
      ))}
    </View>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails({ movieId: id as string })
  );
  return (
    <View className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            className="w-full h-[550px]"
            resizeMode="stretch"
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
          />
        </View>
        <View className="px-5 mt-5">
          <Text className="text-lg font-bold">{movie?.title}</Text>
          <View className="flex-row gap-x-2 mb-1">
            <Text className="text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-sm">{movie?.runtime}m</Text>
          </View>
          <View className="flex-row gap-x-2 rounded-lg px-3 py-1 bg-gray-200 items-center self-start">
            <Image source={icons.star} className="size-4" />
            <Text className="text-medium font-medium">
              {Math.round(movie?.vote_average)}/10
            </Text>
            <Text className="text-sm">
              ({formatVoteCount(movie?.vote_count)})
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <View className="flex-row gap-x-20">
            <MovieInfo
              label="Release Date"
              value={
                movie?.release_date
                  ? new Date(movie.release_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"
              }
            />
            <MovieInfo label="Status" value={movie?.status} />
          </View>
          <MovieGenres genres={movie?.genres} />
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((prod: { name: string }) => prod.name)
                .join(" - ") || "N/A"
            }
          />
          <MovieInfo
            label="Countries"
            value={
              movie?.production_countries
                ?.map((country: { name: string }) => country.name)
                .join(" • ") || "N/A"
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
